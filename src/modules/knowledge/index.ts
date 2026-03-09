/**
 * Owns local knowledge-library listing and markdown reads.
 *
 * @module knowledge
 * @see module:lib/knowledge
 * @remarks
 * Side effects: reads from local knowledge filesystem.
 * Error behavior: returns null/[] for missing or invalid paths.
 */
export {
  knowledgeExists,
  listKnowledgeCategories,
  curatedKnowledgeCategories,
  listKnowledgeMarkdown,
  knowledgeMarkdownMtime,
  readKnowledgeMarkdown,
  titleFromRelPath,
} from "@/lib/knowledge";
