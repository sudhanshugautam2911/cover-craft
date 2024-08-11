import { db } from "@/db";
import { notFound } from "next/navigation";
import DesignConfigurator from "./DesignConfigurator";

interface PageProps {
  searchParams: {
    [key: string]: string | undefined;
  };
}

const Page = async ({ searchParams }: PageProps) => {
  // make db call
  const { id } = searchParams;

  if (!id || typeof id !== 'string') {
    return notFound();
  }

  // get image from db
  const configuration = await db.configuration.findUnique({
    where: { id }
  })

  if (!configuration) {
    return notFound();
  }

  const { imageUrl, width, height } = configuration;

  return (
    // resizing can be done in client side component only so creating a client side compo.
    <DesignConfigurator
      imageDimensions={{ width, height }}
      configId={configuration.id}
      imageUrl={configuration.imageUrl} />
  )
}

export default Page