import {
  Card,
  CardContent,
  CardHeader
} from "@/components/ui/card";

const HomePage = async () => {
  const rolesList = [
    {
      label: "User",
      description: "Standard users can create reviews, providing their ratings and textual feedback on films."
    }, {
      label: "Critic",
      description: "In addition to the user capabilities, critics have an expanded set of fields, allowing them to include links to articles and specify their place of work, adding credibility to their insights."
    }, {
      label: "Admin",
      description: "Administrators have access to a dedicated dashboard where they can add new films, edit existing entries and remove films as necessary."
    }
  ];
  const featuresList = [
    {
      label: "User Authentication",
      description: "The platform includes secure sign-in and sign-up forms, ensuring that user data is protected."
    },
    {
      label: "Profile Management",
      description: "Users can easily update their profiles on a dedicated page, allowing for a personalized experience."
    },
    {
      label: "Film Details Page",
      description: "Each film has a dedicated page showcasing detailed information, user ratings, critic evaluations, and a selection of the latest reviews."
    },
    {
      label: "Review Statistics",
      description: "Users can view the average rating of films and statistics on review statuses - positive, negative, and mixed - along with filtering options for a tailored browsing experience."
    },
    {
      label: "Pagination",
      description: "The reviews page features pagination, ensuring that users can navigate through extensive feedback seamlessly."
    },
    {
      label: "Dynamic Categories",
      description: "The platform is designed with scalability in mind, allowing for the addition of new categories, for instance games and music, to broaden the scope of user engagement."
    },
    {
      label: "Theme Toggle",
      description: "Users can switch between dark and light themes, enhancing accessibility and user comfort."
    },
    {
      label: "Responsive Design",
      description: "The application is fully responsive, providing an great experience on both desktop and mobile devices."
    }
  ];
  const technologiesList = [
    {
      label: "Next.js",
      description: "For server-side rendering and optimized performance."
    },
    {
      label: "Shadcn UI",
      description: "To create a visually appealing and user-friendly interface."
    },
    {
      label: "Drizzle ORM",
      description: "For seamless database interactions."
    },
    {
      label: "Neon Database",
      description: "To manage and store user and film data securely."
    },
    {
      label: "ImageKit",
      description: "For efficient digital asset management, ensuring that images load quickly and reliably."
    }
  ];
  return (
    <>
      <h1 className="font-bebas-neue leading-none text-[4rem] md:text-[6rem] text-primary uppercase py-3 md:py-5">Movie Review Hub</h1>
      <p className="mb-8">As a developer, I am excited to introduce my resume project, Movie Review Hub - a dynamic platform designed for movie enthusiasts to share their thoughts and ratings on a wide array of films. This application not only highlights my technical abilities but also reflects my dedication to developing user-friendly and engaging web experiences.</p>
      <h2 className="text-xl font-medium mb-2">Overview</h2>
      <p className="mb-8">The Movie Review Platform features a sleek and intuitive interface where users can browse a curated list of films, search for specific titles, and leave detailed reviews. With a focus on community engagement, the platform allows users to express their opinions through text reviews and ratings, promoting lively discussions about cinema.</p>
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-4 mb-4">
        <Card className="mb-4 lg:col-span-1">
          <CardHeader>
            <h2 className="text-xl font-medium">Roles</h2>
          </CardHeader>
          <CardContent>
            <p className="mb-4">The application supports multiple user roles, each with distinct capabilities:</p>
            <div className="mb-8">
              {rolesList?.map((role) => (
                <div key={role.label}
                  className="mb-4 grid grid-cols-[25px_1fr] items-start pb-2 last:mb-0 last:pb-0 max-w-[500px]"
                >
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-primary" />
                  <div className="space-y-1">
                    <p className="font-medium leading-none text-primary">
                      {role.label}
                    </p>
                    <p className="text-sm">
                      {role.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="mb-4 lg:col-span-1">
          <CardHeader>
            <h2 className="text-xl font-medium mb-4">Technologies Used</h2>
          </CardHeader>
          <CardContent>
            <p className="mb-4">This project leverages modern technologies to deliver a robust and efficient application:</p>
            <div className="mb-8">
              {technologiesList?.map((technology) => (
                <div key={technology.label}
                  className="mb-4 grid grid-cols-[25px_1fr] items-start pb-2 last:mb-0 last:pb-0 max-w-[500px]"
                >
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-primary" />
                  <div className="space-y-1">
                    <p className="font-medium leading-none text-primary">
                      {technology.label}
                    </p>
                    <p className="text-sm">
                      {technology.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="mb-4 lg:col-span-2">
          <CardHeader>
            <h2 className="text-xl font-medium">Features</h2>
          </CardHeader>
          <CardContent className="mb-8 grid md:grid-cols-2 md:gap-x-6">
            {featuresList?.map((feature) => (
              <div key={feature.label}
                className="mb-4 grid grid-cols-[25px_1fr] items-start pb-2 last:mb-0 last:pb-0 max-w-[500px]"
              >
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-primary" />
                <div className="space-y-1">
                  <p className="font-medium leading-none text-primary">
                    {feature.label}
                  </p>
                  <p className="text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      <p className="mb-8 font-semibold text-center">Thank you for your attention!❤️</p>
    </>
  );
}
export default HomePage;
