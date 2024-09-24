"use client";
import { getPosts } from "@/apis/posts";
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
import classNames from "classnames";
import { usePathname, useSearchParams } from "next/navigation";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export default function InfinityPosts() {
  const [loading, setLoading] = useState(false);
  const [rendering, setRendering] = useState(true);
  const refCountPage = useRef<number>(1);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const pathName = usePathname();
  const searchParam = useSearchParams();
  const search = searchParam.get("q");
  const skeletonCount = 8;
  const searchQueries = useMemo(() => {
    if (pathName !== links.adorables.search) return undefined;

    if (search) {
      return search;
    }
  }, [pathName, search]);
  const fetchPosts = useCallback(async (page = 0, search?: string) => {
    setLoading(true);
    await delay(800);
    const res = await getPosts({ page, search });
    if (!res || res.errors) {
      setLoading(false);
      setRendering(false);
      setHasNextPage(false);
      return [];
    }

    const data = res.data;

    if (page >= data.pages) setHasNextPage(false);
    setLoading(false);
    setRendering(false);
    return data.data;
  }, []);
  const lastPostRef = useIntersectionObserver<HTMLDivElement>(() => {
    refCountPage.current++;
    fetchPosts(refCountPage.current).then((newPosts) => {
      setPosts((prev) => [...prev, ...newPosts]);
    });
  }, [hasNextPage, !loading]);
  useEffect(() => {
    setRendering(true);
    if (searchQueries) {
      fetchPosts(refCountPage.current, searchQueries).then((newPosts) =>
        setPosts((posts) => [...newPosts])
      );
      return;
    }

    fetchPosts().then(setPosts);
  }, [fetchPosts, searchQueries]);

  return (
    <>
      <div
        className={classNames("grid", {
          "lg:grid-cols-4 gap-4 py-4": true,
          "md:grid-cols-3": true,
        })}
      >
        {rendering
          ? Array.from({ length: skeletonCount }).map((_, index) => (
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
            ))
          : posts.map((item, index) => (
              <div
                key={index}
                ref={posts.length - 1 === index ? lastPostRef : null}
              >
                <Post variant="rounded" data={item} />
              </div>
            ))}
      </div>
      {!hasNextPage && posts.length > 0 && (
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
      {!hasNextPage && posts.length <= 0 && searchQueries && (
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
