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
  userId: string;
  url: string;
  slug: string;
}

interface CreateLinkResult<T> extends CustomResponseType<T> {}

interface DeleteLinkVars {
  id: string;
}

interface DeleteLinkResult<T> extends CustomResponseType<T> {}

interface GetLinkStatsVars {
  slug: string;
  fromDate: string;
  toDate: string;
}

interface GetLinkStatsResult<T> extends CustomResponseType<T> {}
