// hooks/useFilteredPosts.js
export const useFilteredPosts = (
    allPosts,
    { searchTerm, sortCategory, sortCity, jobType, experienceLevel, sortOptions }
) => {
    const filtered = allPosts.filter((post) => {
        const matchesSearch =
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.company.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory =
            sortCategory === "all" || post.category === sortCategory;

        const matchesCity =
            sortCity === "all" ||
            post.location?.toLowerCase().includes(sortCity.toLowerCase());

        const matchJobType = jobType === "all" || post.jobType === jobType;

        const matchExperienceLevel =
            experienceLevel === "all" || post.experienceLevel == experienceLevel;

        return (
            matchesCategory &&
            matchesSearch &&
            matchesCity &&
            matchJobType &&
            matchExperienceLevel
        );
    });

    const sorted = [...filtered].sort((a, b) => {
        if (sortOptions === "newest") return b.createdAt - a.createdAt;
        if (sortOptions === "oldest") return a.createdAt - b.createdAt;
        return 0;
    });

    return sorted;
};
