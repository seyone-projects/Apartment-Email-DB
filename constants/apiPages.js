export const apiPages = [
  { pageName: "Dashboard", api: "/dashboard" },

  { pageName: "Association Details", api: "/city/get/state" },
  { pageName: "Association Details", api: "/city/get/city" },
  { pageName: "Association Details", api: "/association/update" },
  { pageName: "Association Details", api: "/association/create" },
  { pageName: "Association Details", api: "/upload/image" },

  { pageName: "Ledger", api: "/association/details/amount/visible/members" },
  { pageName: "Ledger", api: "/association/details/delete/image" },
  { pageName: "Ledger", api: "/association/details/update" },
  { pageName: "Ledger", api: "/association/details/create" },
  { pageName: "Ledger", api: "/association/details/delete" },
  { pageName: "Ledger", api: "/association/details/get" },
  { pageName: "Ledger", api: "/association/details/get/pdfReport" },
  { pageName: "Ledger", api: "/association/details/amount/get" },
  { pageName: "Ledger", api: "/association/get/logo" },
  { pageName: "Ledger", api: "/association/get" },

  { pageName: "Quick Bill", api: "/association/get/logo" },
  { pageName: "Quick Bill", api: "/association/details/account/get" },
  { pageName: "Quick Bill", api: "/association/details/create" },

  { pageName: "Bank Account", api: "/association/details/amount/get" },
  { pageName: "Bank Account", api: "/association/details/amount/update" },
  { pageName: "Bank Account", api: "/association/details/amount/create" },

  { pageName: "Amenities", api: "/amenity/get" },
  { pageName: "Amenities", api: "/amenity/type/get" },
  { pageName: "Amenities", api: "/blocks/list/get/all" },
  { pageName: "Amenities", api: "/amenity/update" },
  { pageName: "Amenities", api: "/amenity/create" },
  { pageName: "Amenities", api: "/amenity/delete" },
  { pageName: "Amenities", api: "/amenity/type/create" },

  { pageName: "Association Members", api: "/mc/get/all" },
  { pageName: "Association Members", api: "/mc/delete" },

  { pageName: "Add Member", api: "/mc/create" },

  { pageName: "EC Member Form", api: "/users/by/flat" },
  { pageName: "EC Member Form", api: "/flats/get/booked/list" },
  { pageName: "EC Member Form", api: "/blocks/list/get/all" },
  { pageName: "EC Member Form", api: "/upload/image" },

  { pageName: "Website Management", api: "/website/create" },
  { pageName: "Website Management", api: "/website/get" },

  { pageName: "Approvals", api: "/api/v1/users/get/pending/users" },
  { pageName: "Approvals", api: "/api/v1/users/update/status" },

  { pageName: "Bulk Upload", api: "/users/bulk/upload" },
  { pageName: "Bulk Upload", api: "/flats/unsold/get" },

  { pageName: "Documents", api: "/document/get" },
  { pageName: "Documents", api: "/document/update/visible" },
  { pageName: "Documents", api: "/document/delete" },

  { pageName: "Add Document", api: "/document/update" },
  { pageName: "Add Document", api: "/document/create" },
  { pageName: "Add Document", api: "/document/get" },

  { pageName: "Purchased List", api: "/material/category/get" },
  { pageName: "Purchased List", api: "/material/category/sub/get" },

  { pageName: "Material Purchase Form", api: "/material/category/get" },
  { pageName: "Material Purchase Form", api: "/material/category/sub/get" },
  { pageName: "Material Purchase Form", api: "/material/create" },

  { pageName: "Categories", api: "/material/update" },
  { pageName: "Categories", api: "/material/create" },
  { pageName: "Categories", api: "/material/delete" },
  { pageName: "Categories", api: "/material/get" },
  { pageName: "Categories", api: "/material/get" },

  { pageName: "Activity Logs", api: "/material/logs/get" },

  { pageName: "Product Warranty", api: "/product/get" },
  { pageName: "Product Warranty", api: "/product/update" },
  { pageName: "Product Warranty", api: "/product/delete" },

  { pageName: "Add Warranty", api: "/product/get" },
  { pageName: "Add Warranty", api: "/product/get" },
  { pageName: "Add Warranty", api: "/product/update" },
  { pageName: "Add Warranty", api: "/product/create" },
  { pageName: "Add Warranty", api: "/product/delete" },

  { pageName: "Resident Details", api: "/users/resident/list" },

  { pageName: "Scroll Events", api: "/events/get/all" },
  { pageName: "Scroll Events", api: "/events/delete" },
  { pageName: "Scroll Events", api: "/events/update" },
  { pageName: "Scroll Events", api: "/events/create" },

  { pageName: "Meetings and Reminders", api: "/notification/create" },

  { pageName: "Tickets", api: "/api/v1/tickets/update/status" },
  { pageName: "Tickets", api: "/api/v1/tickets/get/all" },

  { pageName: "Amenities Bookings", api: "/amenity/booking/get" },
  { pageName: "Amenities Bookings", api: "/amenity/booking/update" },
  { pageName: "Amenities Bookings", api: "/amenity/booking/get/booked/dates" },
  { pageName: "Amenities Bookings", api: "/amenity/booking/delete" },

  { pageName: "Gallery", api: "/gallery/get" },
  { pageName: "Gallery", api: "/gallery/delete" },
  { pageName: "Gallery", api: "/api/gallery/{feedId}/comments" },
  { pageName: "Gallery", api: "/gallery/comment/get" },

  { pageName: "Gallery Form", api: "/gallery/type/get" },
  { pageName: "Gallery Form", api: "/gallery/create" },

  { pageName: "Gallery Category", api: "/gallery/type/get" },
  { pageName: "Gallery Category", api: "/gallery/type/create" },
  { pageName: "Gallery Category", api: "/gallery/type/update" },
  { pageName: "Gallery Category", api: "/gallery/type/delete" },

  { pageName: "Maintenance Worksheet", api: "/maintenance/expense/create" },
  { pageName: "Maintenance Worksheet", api: "/maintenance/expense/update" },
  { pageName: "Maintenance Worksheet", api: "/maintenance/expense/get" },
  { pageName: "Maintenance Worksheet", api: "/maintenance/expense/remove" },
  { pageName: "Maintenance Worksheet", api: "/maintenance/category/get" },

  { pageName: "Add Dues", api: "/flats/get/booked/list" },
  { pageName: "Add Dues", api: "/blocks/list/get/all" },
  { pageName: "Add Dues", api: "/users/by/flat" },

  { pageName: "Invoice", api: "/association/details/account/get" },
  { pageName: "Invoice", api: "/association/get/logo" },
  { pageName: "Invoice", api: "/maintenance/expense/members/invoice" },

  { pageName: "Staffs", api: "/users/staff/get/all" },
  { pageName: "Staffs", api: "/users/staff/delete" },

  { pageName: "Vendor", api: "/vendor/delete" },
  { pageName: "Vendor", api: "/vendor/get/all" },
];
