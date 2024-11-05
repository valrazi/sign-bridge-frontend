export const useFormatter = () => {
  const formatPrice = (price = 0) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(parseFloat((price || "0").toString()) || 0);
  };

  const formatCapitalize = (text: string) => {
    return text
      .trim()
      .toLowerCase()
      .split(' ')
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(' ')
  }

  const getInitial = (text: string, limit = 2) => {
    return text
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, limit)
  }

  return { formatPrice, formatCapitalize, getInitial };
};
