import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();
    // const salt = await bcryptjs.genSalt(10);
    // const hashedPassword = await bcryptjs.hash(password, salt);

    console.log("name", name);

    const user = await User.findOne({ email });

    console.log("user", user);

    if (user) {
      return NextResponse.json(
        { message: "User already exists"  },
        { status: 400 }
      );
    }

   
    // const newUser = new User({
    //   name,
    //   email,
    //   password,
    // });
    // const savedUser = await newUser.save();
    // console.log(savedUser);

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
