import { createSupabaseClient } from "@/lib/supabase/client/general";
import ts from "typescript";

export async function loadJS(bucketName: string, url: string): Promise<string> {
  try {
    const supabase = await createSupabaseClient();

    const { data } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(url, 3600);

    if (!data) {
      throw new Error(`JSファイルが見つかりません: ${bucketName}、${url}`);
    }

    const response = await fetch(data.signedUrl);
    const jsContent = await response.text();

    return jsContent;
  } catch (error) {
    throw new Error(
      `JSファイルロードに失敗しました: ${bucketName}、${url}、${error}`
    );
  }
}

export async function getFuncFromJS<T = any>(
  jsContent: string,
  functionName: string = "default"
): Promise<T> {
  try {
    // TypeScriptコードをJavaScriptにコンパイル
    const compilerOptions: ts.CompilerOptions = {
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.CommonJS,
      esModuleInterop: true,
      allowSyntheticDefaultImports: true,
      strict: false,
      skipLibCheck: true,
    };

    // TypeScriptコンパイル実行
    const result = ts.transpile(jsContent, compilerOptions);

    // Node.js環境で動的モジュール実行
    const moduleExports: any = {};
    const moduleObj = { exports: moduleExports };

    // Function constructorを使用してコード実行
    const moduleFunction = new Function("exports", "module", result);

    // モジュール実行
    moduleFunction(moduleExports, moduleObj);

    // 最終exportsを決定
    const finalExports =
      moduleObj.exports && Object.keys(moduleObj.exports).length > 0
        ? moduleObj.exports
        : moduleExports;

    if (functionName === "default") {
      return finalExports.default || finalExports;
    } else {
      return finalExports[functionName];
    }
  } catch (error) {
    throw new Error(
      `JSファイルから関数を取得に失敗しました: ${functionName}、${error}`
    );
  }
}

// TODO: any 変更
export async function loadJSAndGetFunc<T = any>(
  bucketName: string,
  url: string,
  functionName: string = "default"
): Promise<T> {
  const jsContent = await loadJS(bucketName, url);
  return getFuncFromJS<T>(jsContent, functionName);
}
