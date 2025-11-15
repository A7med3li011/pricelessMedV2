export default async function SearchHomeFacility(
  type: string,
  searchTerm: string
) {
  try {
    const response = await fetch(
      `https://pricelessmed.com/api/website/search-facility?page=1&pageLimit=10&type=${type}&search=${searchTerm}`
    );

    if (!response.ok) {
      return {
        data: null,
        success: false,
        error: {
          message: `Failed to fetch facilities: ${response.statusText}`,
          status: response.status,
        },
      };
    }

    const result = await response.json();

 

    return {
      data: result.data || [],
      success: true,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      success: false,
      error: {
        message:
          err instanceof Error ? err.message : "An unknown error occurred",
        status: 500,
      },
    };
  }
}
