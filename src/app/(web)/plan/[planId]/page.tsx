interface PlanPageProps {
  params: Promise<{
    planId: string;
  }>;
}

export default async function PlanPage({ params }: PlanPageProps) {
  const { planId } = await params;

  return (
    <div>
      <h1>Plan Details</h1>
      <p>Plan ID: {planId}</p>
    </div>
  );
}
