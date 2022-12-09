export async function getServerSideProps(ctx) {
	const locale = getLocale(ctx.locale);

	return {
		props: {
			locale,
		},
	};
}

export default function Home({ locale }) {
	return null;
}
