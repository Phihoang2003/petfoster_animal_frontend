"use client";
import { getPosts, getPostsOfUser } from "@/apis/posts";
import SkeletonAnimation from "@/components/animations/SkeletonAnimation";
import LoadingSecondary from "@/components/common/loadings/LoadingSecondary";
import Post from "@/components/pages/posts/Post";
import { IPost } from "@/configs/interface";
import { links } from "@/data/links";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { delay } from "@/utils/functionals";
import { faCircleCheck, faFaceSadCry } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Grid2, Skeleton } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import classNames from "classnames";
import { usePathname, useSearchParams } from "next/navigation";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
export interface IInfinityPostsProps {
  type?: string;
  username?: string;
}
export default function InfinityPosts({ type, username }: IInfinityPostsProps) {
  const [rendering, setRendering] = useState(true);
  const pathName = usePathname();
  const searchParam = useSearchParams();
  const search = searchParam.get("q");
  const skeletonCount = 8;
  const intObserver = useRef<IntersectionObserver | null>(null);
  const searchQueries = useMemo(() => {
    if (pathName !== links.adorables.search) return undefined;

    if (search) {
      return search;
    }
  }, [pathName, search]);
  const rawPosts = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: async ({ pageParam = 1 }) => {
      if (!type || !username) {
        return await getPosts({ page: pageParam, search: searchQueries });
      } else {
        return await getPostsOfUser({
          page: pageParam,
          type,
          username,
        });
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, allPage) => {
      return lastPage?.data?.data.length ? allPage.length + 1 : undefined;
    },
  });
  useEffect(() => {
    if (!rawPosts.isLoading && !rawPosts.isFetching) {
      setRendering(false);
    }
  }, [rawPosts.isLoading, rawPosts.isFetching]);
  const lastPostRef = useCallback(
    (post: any) => {
      if (rawPosts.isFetchingNextPage) {
        setRendering(true);
        return;
      }

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && rawPosts.hasNextPage) {
          rawPosts.fetchNextPage();
        }
      });

      if (post) intObserver.current.observe(post);
    },
    [rawPosts]
  );

  const data = useMemo(() => {
    if (rawPosts.isError || !rawPosts.data) return null;
    return rawPosts?.data;
  }, [rawPosts]);

  return (
    <>
      {rendering ? (
        <div
          className={classNames("grid", {
            "lg:grid-cols-4 gap-4 py-4": true,
            "md:grid-cols-3": true,
          })}
        >
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <Box key={index} sx={{ width: 210, marginRight: 0.5, my: 5 }}>
              <Box sx={{ pt: 0.5 }}>
                <SkeletonAnimation
                  variant="rectangular"
                  width="300px"
                  height="160px"
                />
                <SkeletonAnimation width="100%" sx={{ mt: 1 }} />
                <SkeletonAnimation width="60%" sx={{ mt: 1 }} />
              </Box>
            </Box>
          ))}
        </div>
      ) : (
        data?.pages[0]?.data?.data.length > 0 && (
          <div
            className={classNames("grid", {
              "lg:grid-cols-4 gap-4 py-4": true,
              "md:grid-cols-3": true,
            })}
          >
            {!rawPosts.isLoading &&
              data &&
              data.pages.map((item) => {
                return item.data.data.map((i: IPost) => {
                  return (
                    <div key={i.id} ref={lastPostRef}>
                      <Post variant="rounded" data={i} />
                    </div>
                  );
                });
              })}
          </div>
        )
      )}

      {!rawPosts.hasNextPage &&
        data &&
        data.pages[0]?.data?.data.length > 0 && (
          <div className="flex items-center justify-center py-10 overflow-hidden flex-col gap-2 border-2 border-green-600 rounded-xl mb-10 mt-5">
            <FontAwesomeIcon
              className="text-green-600 text-4xl"
              icon={faCircleCheck}
            />
            <span className="text-black-main font-medium">
              All the latest bulletin boards have been loaded
            </span>
          </div>
        )}
      {!rawPosts.hasNextPage &&
        data &&
        data.pages[0]?.data?.data.length <= 0 &&
        searchQueries && (
          <div className="flex items-center justify-center py-10 overflow-hidden flex-col gap-2 border-2 border-green-600 rounded-xl mb-10 mt-5">
            <FontAwesomeIcon
              className="text-green-600 text-4xl"
              icon={faFaceSadCry}
            />
            <span className="text-black-main font-medium">
              There are no results matching the keyword &quot;{searchQueries}
              &ldquo;
            </span>
          </div>
        )}
    </>
  );
}
