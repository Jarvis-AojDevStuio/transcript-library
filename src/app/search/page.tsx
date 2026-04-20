import { SearchExperience } from "@/components/SearchExperience";
import { getSuggestedSearchTopics } from "@/lib/search-suggestions";
import { searchTranscriptLibrary } from "@/modules/search";

export const dynamic = "force-dynamic";

function pickQuery(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const params = await searchParams;
  const query = pickQuery(params.q).trim();
  const response = query.length >= 2 ? searchTranscriptLibrary(query) : null;
  const suggestions = getSuggestedSearchTopics();

  return (
    <SearchExperience
      key={query || "empty"}
      initialQuery={query}
      initialResponse={response}
      suggestions={suggestions}
    />
  );
}
