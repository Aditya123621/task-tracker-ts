interface QueryParamsPropTypes {
  baseUrl: string;
  params: Record<
    string,
    string | number | boolean | (string | number)[] | null | undefined
  >;
}

const createQueryParamsForGetReq = ({
  baseUrl,
  params = {},
}: QueryParamsPropTypes) => {
  const arr = [];
  for (const [key, value] of Object.entries(params)) {
    if (
      value !== undefined &&
      value !== "" &&
      value !== null &&
      !(typeof value === "number" && isNaN(value)) &&
      !(Array.isArray(value) && value.length === 0)
    ) {
      arr.push(`&${key}=${Array.isArray(value) ? value?.toString() : value}`);
    }
  }
  const url = `${baseUrl}${arr.join("")}`;
  return url.replace("/&", "/?");
};
export default createQueryParamsForGetReq;
