interface CustomResponseType<T> {
  success: boolean;
  message?: string;
  data?: T;
}

interface GetLinkVars {
  userId: string;
}

interface GetLinkResult<T> extends CustomResponseType<T> {}

interface CreateLinkVars {
  user_id: string;
  url: string;
  slug: string;
}

interface CreateLinkResult<T> extends CustomResponseType<T> {}
