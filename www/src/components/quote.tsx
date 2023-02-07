import Image from "next/image";

export function Quote(props: {
  text: string;
  author: {
    name: string;
    handle: string;
    avatar: string;
    link: string;
  };
}) {
  return (
    <blockquote className="quote relative my-3 w-full rounded-md border-l-4 border-neutral-500 bg-purple-200 p-2 text-sm italic text-zinc-900 dark:bg-purple-300/20 dark:text-purple-50">
      <div className="relative flex w-fit items-center justify-center p-1">
        <p className="mb-4 text-lg">
          <span aria-hidden="true">&quot;</span>
          {props.text}
          <span aria-hidden="true">&quot;</span>
        </p>
      </div>
      <cite className="flex items-center justify-end pr-4 pb-2">
        <Image
          alt="Avatar of @alexdotjs"
          className="w-12 rounded-full bg-neutral-500 [margin-inline-end:16px]"
          height={48}
          width={48}
          src={props.author.avatar}
        />
        <div className="flex flex-col items-start not-italic">
          <span className=" text-sm font-semibold">{props.author.name}</span>
          <a
            href="https://twitter.com/alexdotjs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm"
          >
            @{props.author.handle}
          </a>
        </div>
      </cite>
    </blockquote>
  );
}
