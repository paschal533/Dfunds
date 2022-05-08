import { Spinner } from "@chakra-ui/react";

const Loader = () => {
  return (
    <div
      style={{
        borderRadius: '8px',
        padding: '20px'
      }}
      className="flex h-[250px] flex-col items-center justify-center py-2"
    >
       <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
    </div>
  )
}

export default Loader;