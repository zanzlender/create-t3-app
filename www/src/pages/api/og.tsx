/* eslint-disable import/no-anonymous-default-export, @next/next/no-img-element */
import { ImageResponse } from "@vercel/og";

import { getFont } from "~/utils/og-fonts";
import { docsParams } from "~/utils/zod-params";

export const config = {
  runtime: "edge",
};

export default async (req: Request) => {
  const url = new URL(req.url);
  const inter = await getFont({
    family: "Inter",
    weights: [400, 700] as const,
  });

  const params = docsParams.decodeRequest(req);
  if (!params.success)
    return new Response("Invalid params" + params.error.toString(), {
      status: 400,
    });
  const props = params.data.input;

  const baseUrl = `${url.protocol}//${url.host}`;

  return new ImageResponse(
    (
      <div tw="bg-zinc-800 h-full w-full text-stone-300 flex justify-around p-4 font-[Inter]">
        <div tw="flex flex-col justify-center h-full">
          <p tw="pt-6 my-0 text-indigo-600 font-bold flex self-start">
            <span>{props.readingTime} min read</span>
          </p>
          <h1 tw="text-6xl font-bold max-w-2xl">{props.title}</h1>
          <p tw=" text-2xl my-0 font-normal max-w-2xl">{props.description}</p>
          <p tw="pt-2 my-0 text-indigo-600 font-bold flex self-start">
            <span>
              {baseUrl}
              {props.slug}
            </span>
          </p>
        </div>
        <div tw="flex items-center h-full">
          <svg
            width="258"
            height="198"
            className="h-10 w-10 text-black dark:text-white"
            viewBox="0 0 258 198"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_1_3)">
              <path
                d="M165.269 24.0976L188.481 -0.000411987H0V24.0976H165.269Z"
                fill="currentColor"
              />
              <path
                d="M163.515 95.3516L253.556 2.71059H220.74L145.151 79.7886L163.515 95.3516Z"
                fill="currentColor"
              />
              <path
                d="M233.192 130.446C233.192 154.103 214.014 173.282 190.357 173.282C171.249 173.282 155.047 160.766 149.534 143.467L146.159 132.876L126.863 152.171L128.626 156.364C138.749 180.449 162.568 197.382 190.357 197.382C227.325 197.382 257.293 167.414 257.293 130.446C257.293 105.965 243.933 84.7676 224.49 73.1186L219.929 70.3856L202.261 88.2806L210.322 92.5356C223.937 99.7236 233.192 114.009 233.192 130.446Z"
                fill="currentColor"
              />
              <path
                d="M87.797 191.697V44.6736H63.699V191.697H87.797Z"
                fill="currentColor"
              />
            </g>
            <defs>
              <clipPath id="clip0_1_3">
                <rect width="258" height="198" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
      fonts: [
        { name: "Inter", data: inter[400], weight: 400 },
        { name: "Inter", data: inter[700], weight: 700 },
      ],
    },
  );
};
