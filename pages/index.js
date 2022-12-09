import { getLocale } from '../utils/locale';
import Splatoon from '../subdomains/Splatoon/Splatoon';

export async function getServerSideProps(ctx) {
	const subdomain = ctx.req.headers.host.split('.')[0];

	const locale = getLocale(ctx.locale);

	return {
		props: {
			locale,
			subdomain
		},
	};
}

export default function Home({ locale, subdomain }) {
	switch (subdomain) {
		case 'splatoon':
			return <Splatoon locale={locale}/>;
		default:
			return <p>Someone messed up the DNS records. Yippee. \(^._.^)/</p>;
	}
}
