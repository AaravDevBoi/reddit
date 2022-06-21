import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
	uri: "https://eloimendes.stepzen.net/api/bailing-quoll/__graphql",
	headers: {
		Authorization: `Apikey ${process.env.NEXT_PUBLIC_STEPZEN_KEY}`
	},
	cache: new InMemoryCache(),
});

export default client;