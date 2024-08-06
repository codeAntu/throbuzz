import ProfileLayout from "../layout";

export default function userProfile({ params } : { params: any }) {
  return (
    <div className="">
      <h1>CodeAntu Page</h1>
      <p>This is the page</p>
      <div className="text-red-500">{params.userName} </div>
    </div>
  );
}
