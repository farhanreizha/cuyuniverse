import {formatTime} from "@/utils/jsHelper";
import {Link} from "@inertiajs/inertia-react";

const noPosts = () => {
  return (
    <div className="text-center">
      <h6 className="font-bold">
        <progress className="progress w-56"></progress>
      </h6>
    </div>
  );
};

const isPosts = (posts, from) => {
  return posts.map((post, i) => {
    let more = false;
    let desc = post.description;
    if (desc.length > 150) {
      desc = desc.slice(0, 150);
      more = true;
    }

    console.log(posts);
    return (
      <Link
        href={`/post/${post.id}`}
        method="get"
        as="div"
        key={i}
        className="duration-400 card mx-auto mb-4 w-full cursor-pointer rounded-md bg-slate-50 text-black shadow-md transition ease-in-out hover:-translate-y-1 hover:bg-slate-200 hover:shadow-xl dark:border-0 dark:bg-slate-500 dark:text-white dark:shadow-none dark:hover:bg-slate-700 md:w-[97%]">
        {post.image && (
          <div className="md:shrink-0">
            <img src={`/storage/images/posts/${post.image}`} alt="Post Image" className="mx-auto w-full" />
          </div>
        )}
        <div className="card-body">
          {post.hashtag && (
            <Link className="card-title" as="a" href={`/?tag=${post.hashtag}`}>
              <div className="badge badge-primary text-primary-content">#{post.hashtag}</div>
            </Link>
          )}
          <div className="break-normal break-words text-xl">
            {desc}
            {more && <span className="text-sm italic text-primary"> ...lebih lengkap</span>}
          </div>

          <div className="mt-2 flex flex-row items-center py-2">
            <Link href={`/author/${post.author}`} as="button" method="get" className="avatar">
              <div className="w-8 rounded-full">
                {from?.page == "author" ? (
                  <img
                    src={
                      from.author_image !== null
                        ? `/storage/images/${from.author_image}`
                        : "/storage/images/defaultavatar.png"
                    }
                  />
                ) : (
                  <img
                    src={
                      post.users && post.users.image !== null
                        ? `/storage/images/${post.users.image}`
                        : "/storage/images/defaultavatar.png"
                    }
                  />
                )}
              </div>
            </Link>
            <div className="ml-2 text-sm">
              <p className="leading-none dark:text-white">{post.author}</p>
              <p className="break-normal break-words">
                posted {formatTime(post.updated_at)} |{" "}
                {post.comments && post.comments.length > 0 ? post.comments.length : "no"} comment
              </p>
            </div>
          </div>
        </div>
      </Link>
    );
  });
};

export default function PostsList(props) {
  if (!props.posts || !props.posts.length) return noPosts();
  return isPosts(props.posts, props.from);
}
