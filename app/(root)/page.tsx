// import { db } from "@/database/drizzle";
// import { users } from "@/database/schema";

const HomePage = async () => {
  // const result = await db.select().from(users);
  // console.log(JSON.stringify(result, null, 2));
  return (
    <h2 className="font-bebas-neue leading-none text-[4rem] md:text-[6rem] text-primary uppercase py-3 md:py-5">Home</h2>
  );
}
export default HomePage;
