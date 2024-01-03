import { NextResponse } from "next/server";

export const dataEntries = [
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
];

// Validation function
function validateFields(data) {
  const { name, email, age, city } = data;

  if (!name || !email || !age || !city) {
    return { valid: false, error: "All fields are required." };
  }

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: "Invalid email format." };
  }

  return { valid: true };
}

export async function GET(request, { params }) {
  const requestedId = params.slug;

  // Find the matching data entry based on the requestedId
  const matchedData = dataEntries.find(
    (entry) => entry.id.toString() === requestedId
  );

  if (matchedData) {
    return NextResponse.json({ data: matchedData });
  } else {
    return NextResponse.json({ error: "Data not found" }, { status: 404 });
  }
}

export async function POST(request) {
  try {
    const requestData = await request.json();

    // Validate the fields
    const validation = validateFields(requestData);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // Process the valid data
    return NextResponse.json({ message: "Success POST", data: requestData });
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON format" }, { status: 400 });
  }
}

export async function PUT(request) {
  try {
    const requestData = await request.json();

    // Validate the fields
    const validation = validateFields(requestData);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // Process the valid data for PUT
    return NextResponse.json({ message: "Success PUT", data: requestData });
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON format" }, { status: 400 });
  }
}
export async function DELETE(request, { params }) {
  const requestedId = params.slug;

  const matchedData = dataEntries.find(
    (entry) => entry.id.toString() === requestedId
  );

  if (matchedData) {
    return NextResponse.json({ message: "DELETED Successfully" });
  } else {
    return NextResponse.json({ error: "Data not found" }, { status: 404 });
  }
}
