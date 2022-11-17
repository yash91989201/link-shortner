import Head from "next/head";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { GetServerSideProps } from "next";
import { useMutation, useQuery } from "@tanstack/react-query";
import { query_client } from "./_app";
import { getLinks, createLink } from "utils/link";
import type { User, ShortLink } from "@prisma/client";
import toast from "react-hot-toast";
import withAuth from "utils/withAuth";
// import icons
import { HiOutlinePlusSm } from "react-icons/hi";
import { SubmitHandler } from "react-hook-form/dist/types";
import LinkCard from "components/MyLinks/LinkCard";

interface Props {
  user: User;
  links: GetLinkResult<ShortLink[]>;
}

interface FormProps {
  url: string;
  slug: string;
}

export default function MyLinks({ user, links }: Props): JSX.Element {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormProps>();
  const { data: queryResult } = useQuery<GetLinkResult<ShortLink[]>>(
    ["get-links"],
    (): Promise<GetLinkResult<ShortLink[]>> => getLinks({ userId: user.id }),
    {
      initialData: links,
    }
  );
  const { mutate: createLinkMutation } = useMutation({
    mutationKey: ["create-link"],
    mutationFn: (variables: CreateLinkVars) => createLink(variables),
  });

  const createLinkHandler: SubmitHandler<FormProps> = async (formData) => {
    try {
      const id = toast.loading("Creating new short link");
      createLinkMutation(
        { userId: user.id, url: formData.url, slug: formData.slug },
        {
          onSuccess(data) {
            const { success, message } = data;
            if (success) {
              toast.success(message as string, {
                id,
                duration: 3600,
              });
              query_client.refetchQueries(["get-links"]);
              reset();
              return;
            }
            toast.error(message as string, {
              id,
              duration: 3600,
            });
          },
        }
      );
    } catch (error: unknown) {
      if (error instanceof Error)
        toast.error(error.message, {
          duration: 3600,
        });
    }
  };

  return (
    <div className="p-3">
      <Head>
        <title>My Links | Link Shortner</title>
        <meta
          name="description"
          content="Shorten your links and share them all over the world"
        />
      </Head>
      <div className="flex flex-col max-w-6xl mx-auto">
        <h2 className="my-3 text-lg font-bold md:my-6 md:text-2xl">My Links</h2>
        <form className="my-3" onSubmit={handleSubmit(createLinkHandler)}>
          <div className="flex flex-col space-x-0 space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
            <div className="flex flex-col flex-1 space-x-0 space-y-3 xs:flex-row xs:space-x-3 xs:space-y-0">
              <input
                {...register("url", { required: true })}
                className="flex-1 p-2 text-sm border-2 border-gray-300 rounded focus:outline-none focus:border-indigo-500 md:text-base"
                placeholder="Paste your link here"
              />
              <input
                {...register("slug", { required: true })}
                className="flex-1 p-2 text-sm border-2 border-gray-300 rounded focus:outline-none focus:border-indigo-500 md:text-base"
                placeholder="Provide a short name"
              />
            </div>
            <button
              type="submit"
              className="px-3 py-1.5 flex justify-evenly items-center self-center sm:self-auto
                        bg-indigo-500 text-white font-medium rounded text-sm md:text-base"
            >
              <HiOutlinePlusSm />
              <span>New Link</span>
            </button>
          </div>
          <div className="font-medium text-red-500">
            {errors.url && errors.url.type == "required" && (
              <p>Url is required!</p>
            )}
            {errors.slug && errors.slug.type == "required" && (
              <p>Short name is required!</p>
            )}
          </div>
        </form>
        {queryResult.data?.length == 0 && (
          <div className="flex flex-col items-center p-8 my-6 space-y-3 border border-indigo-100 rounded md:p-16">
            <div className="relative w-48 lg:w-72 aspect-square">
              <Image
                src="/assets/empty_list.svg"
                alt="No links"
                layout="fill"
              />
            </div>
            <p className="text-lg font-bold text-indigo-100 md:text-3xl">
              No links created
            </p>
          </div>
        )}
        {
          <div className="grid grid-cols-1 gap-4 my-6 sm:grid-cols-2 md:grid-cols-3">
            {!!queryResult.data &&
              queryResult.data.map((link) => (
                <LinkCard key={link.id} link={link} allLinks />
              ))}
          </div>
        }
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = withAuth({
  async gssp(_, user) {
    const links = await getLinks({ userId: user?.id as string });
    return {
      props: {
        user,
        links,
      },
    };
  },
});
