// hooks/useJobData.js

import { useEffect } from "react";
import { useDispatch } from "react-redux";


export const useJobData = (userId) => {
    const dispatch = useDispatch();
    const {
        data,
        isLoading,
        error,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["posts"],
        queryFn: fetchPostsPage,
        getNextPageParam: (lastPage) => lastPage.lastVisible || undefined,
    });

    const { data: savedJobsIds, isLoading: isBookMarkLoading } =
        useSavedJobs(userId);

    useEffect(() => {
        if (!isBookMarkLoading && savedJobsIds) {
            dispatch(setSavedJobs(savedJobsIds || []));
        }
    }, [isBookMarkLoading, savedJobsIds, dispatch]);

    return {
        data,
        isLoading,
        error,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    };
};
