import React, {useEffect, useRef, useState} from "react";
import {Head, Link} from "@inertiajs/inertia-react";
import PostsList from "@/Components/Homepage/PostsLists";
import Guest from "@/Layouts/Guest";
import {Inertia} from "@inertiajs/inertia";
import {FaArrowLeft} from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";

export default function PostsPage(props) {
  const {auth, title, tags} = props;
  const {data: posts, meta, links} = props.posts;
  const [allPosts, setAllPosts] = useState([...posts]);
  const [tagParam, setQueryParam] = useState("");

  const parseParams = querystring => {
    const params = new URLSearchParams(querystring);
    const obj = {};
    for (const key of params.keys()) {
      if (params.getAll(key).length > 1) {
        obj[key] = params.getAll(key);
      } else {
        obj[key] = params.get(key);
      }
    }
    return obj;
  };

  useEffect(() => {
    let params = parseParams(window.location.search);
    setQueryParam(params.tag);
  }, []);

  const loadMorePosts = () => {
    Inertia.get(
      links.next,
      {},
      {
        preserveState: true,
        preserveScroll: true,
        only: ["posts"],
        onSuccess: ({props}) => {
          setAllPosts([...allPosts, ...props.posts.data]);
          window.history.replaceState({}, document.title, meta.path);
        },
      }
    );
  };

  return (
    <Guest auth={auth.user}>
      <Head title={title} />
      <div className="min-h-screen">
        {tags && tags.length > 0 && (
          <div className="w-full py-2 px-2 lg:mx-auto lg:w-2/3 lg:p-0 lg:py-2 xl:w-5/6">
            <div className="flex flex-row flex-wrap overflow-hidden rounded-sm bg-primary text-primary-content">
              <Link href={route("outer.main")} as="button" className="p-1">
                <FaArrowLeft />
              </Link>
              <h5 className="p-1 italic">in trending</h5>
              {tags.map((trend, i) => {
                return (
                  <span className="py-1" key={i}>
                    <a
                      name="tag"
                      className={`${
                        trend.hashtag == tagParam && "bg-white text-black"
                      } link px-2 font-bold hover:cursor-pointer hover:bg-white hover:text-black`}
                      href={`/?tag=${trend.hashtag}`}>
                      #{trend.hashtag}
                    </a>
                  </span>
                );
              })}
            </div>
          </div>
        )}
        {posts.length > 0 ? (
          <div className="mx-auto w-full py-2 px-2 lg:w-2/3 lg:p-0 lg:py-2 xl:w-5/6">
            <h1 className="mb-4 border-b-2 px-2 font-sans text-2xl font-bold">Coders History</h1>
            <InfiniteScroll
              dataLength={allPosts.length}
              next={loadMorePosts}
              hasMore={links.next !== null}
              loader={<h4 style={{textAlign: "center"}}>Loading...</h4>}
              endMessage={
                <p style={{textAlign: "center"}}>
                  <b>🌹...🌹</b>
                </p>
              }>
              <div className="grid grid-cols-3">
                <PostsList posts={allPosts} />
              </div>
            </InfiniteScroll>
          </div>
        ) : (
          <div className="flex justify-center pt-5">
            <div className="alert alert-warning w-11/12 rounded-sm text-slate-900 shadow-lg md:w-1/3">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="h-6 w-6 flex-shrink-0 stroke-current">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Belum ada postingan yang tersedia</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Guest>
  );
}
