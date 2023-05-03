import { computed, onMounted } from 'vue';
import parts from '../data/parts';

export default function useSearch(searchTerm) {
  const allParts = [...parts.heads, ...parts.arms, ...parts.torsos, ...parts.bases];

  const results = computed(() => {
    let searchResults;
    if (!searchTerm.value) searchResults = allParts;
    else {
      const lowerTerm = searchTerm.value.toLowerCase();
      searchResults = allParts.filter(
        (part) => part.title.toLowerCase().includes(lowerTerm),
      );
    }
    return [...searchResults];
  });

  onMounted(() => console.log('Mounted: useSearch'));

  return { searchResults: results };
}
