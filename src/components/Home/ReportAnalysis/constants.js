// Poso Reserved

const SECTIONS = {
  activity: {
    label: "Hoạt động",
    fields: {
      totalOrdersCount: { label: "Số đơn hàng" },
      totalItemsCount: { label: "Số sản phẩm" },
    },
  },
  top_five: {
    label: "Top 5 sản phẩm",
    fields: { quantity: { label: `` } },
  },
  sales: {
    label: "Doanh số bán hàng",
    fields: {
      net_sales: { label: "Doanh thu" },
      salesTax: { label: "Thuế" },
      net_total: { label: "Tổng" },
      totalTipAmount: { label: "Tiền tip" },
      net_total_plus_tips: { label: "Tổng cộng" },
    },
  },
};

const DATA_TO_HIGHLIGHT = ["net_total", "net_total_plus_tips", "subTotal"];

export { DATA_TO_HIGHLIGHT, SECTIONS };
