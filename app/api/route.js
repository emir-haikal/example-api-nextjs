import { NextResponse } from "next/server";

export const dataEntries = {
  data: [
    {
      id: 1,
      name: "Emir",
      email: "emir@gmail.com",
      age: 25,
      city: "Jakarta",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      age: 30,
      city: "Another City",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      age: 28,
      city: "Random City 1",
    },
    {
      id: 4,
      name: "Bob Brown",
      email: "bob.brown@example.com",
      age: 35,
      city: "Random City 2",
    },
    {
      id: 5,
      name: "Charlie Davis",
      email: "charlie.davis@example.com",
      age: 27,
      city: "Random City 3",
    },
    {
      id: 6,
      name: "Diana Wilson",
      email: "diana.wilson@example.com",
      age: 33,
      city: "Random City 4",
    },
    {
      id: 7,
      name: "Evan Miller",
      email: "evan.miller@example.com",
      age: 29,
      city: "Random City 5",
    },
    {
      id: 8,
      name: "Fiona White",
      email: "fiona.white@example.com",
      age: 31,
      city: "Random City 6",
    },
    {
      id: 9,
      name: "George Johnson",
      email: "george.johnson@example.com",
      age: 36,
      city: "Random City 7",
    },
    {
      id: 10,
      name: "Helen Brown",
      email: "helen.brown@example.com",
      age: 34,
      city: "Random City 8",
    },
    {
      id: 11,
      name: "Ivan Taylor",
      email: "ivan.taylor@example.com",
      age: 32,
      city: "Random City 9",
    },
    {
      id: 12,
      name: "Jasmine Turner",
      email: "jasmine.turner@example.com",
      age: 26,
      city: "Random City 10",
    },
    {
      id: 13,
      name: "Keith Anderson",
      email: "keith.anderson@example.com",
      age: 30,
      city: "Random City 11",
    },
    {
      id: 14,
      name: "Linda Parker",
      email: "linda.parker@example.com",
      age: 29,
      city: "Random City 12",
    },
    {
      id: 15,
      name: "Megan Harris",
      email: "megan.harris@example.com",
      age: 28,
      city: "Random City 13",
    },
  ],
};

export async function GET(request, { params }) {
  const pageHeader = request.headers.get("x-page") || 1;
  const pageSizeHeader = request.headers.get("x-page-size") || 5;
  const searchQuery = request.headers.get("x-search") || "";

  const page = parseInt(pageHeader);
  const pageSize = parseInt(pageSizeHeader);

  // Filter dataEntries based on the search query
  const filteredData = dataEntries.data.filter((entry) =>
    Object.values(entry).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Calculate the start and end indices based on pagination parameters
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Extract the relevant portion of filteredData based on pagination
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return NextResponse.json({
    data: paginatedData,
    totalData: filteredData.length,
    pageNumber: page,
    pageSize: pageSize,
  });
}
