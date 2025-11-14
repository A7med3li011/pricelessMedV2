interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

// Provide at least one static param for build-time validation
export async function generateStaticParams() {
  return [
    { slug: 'example' }
  ];
}

export default async function slugPage({ params }: PageProps) {
  const { locale, slug } = await params;

  return <div>Health Hub Article: {slug}</div>;
}
