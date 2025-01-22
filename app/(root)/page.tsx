// import { db } from "@/database/drizzle";
// import { users } from "@/database/schema";



const HomePage = async () => {
  // const result = await db.select().from(users);
  // console.log(JSON.stringify(result, null, 2));
  return (
    <h2 className="font-bebas-neue text-[6rem] leading-tight text-primary uppercase mb-6">Home</h2>
  );
}
export default HomePage;
