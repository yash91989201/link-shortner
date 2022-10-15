import type { ShortLink } from "@prisma/client";

async function getLinks(
  userId: GetLinkVars
): Promise<GetLinkResult<ShortLink[]>> {
  const fetchResult = await fetch("http://localhost:3000/api/link", {
    method: "POST",
    body: JSON.stringify({ userId }) as string,
  });
  const res = await fetchResult.json();

  return res;
}

async function createLink({
  userId,
  url,
  slug,
}: CreateLinkVars): Promise<CreateLinkResult<ShortLink[]>> {
  const fetchResult = await fetch(
    "http://localhost:3000/api/link/create-link",
    {
      method: "POST",
      body: JSON.stringify({
        userId,
        url,
        slug,
      }),
      headers: {
        "content-type": "application/json",
      },
    }
  );
  const res = await fetchResult.json();
  return res;
}

async function deleteLink({ id }: DeleteLinkVars) {
  const fetchResult = await fetch(
    "http://localhost:3000/api/link/delete-link",
    {
      method: "POST",
      body: JSON.stringify({
        id,
      }),
      headers: {
        "content-type": "application/json",
      },
    }
  );
  const res = await fetchResult.json();
  return res;
}

export { getLinks, createLink, deleteLink };
