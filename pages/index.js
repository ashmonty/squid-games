import { getLocale } from '../utils/locale';

export async function getServerSideProps(ctx) {

	const locale = getLocale(ctx.locale);

	return {
		props: {
			locale,
		},
	};
}

export default function Home({ locale, subdomain }) {

	return <p style={{color: '#fff', margin: '1rem'}}>Set up nginx to redirect the subdomain <code>splatoon</code> to <code>/splatoon</code> (^._.^)</p>;

}
