import Banner from '../components/Banner';



export default function Home(){

	const data = {
			title: "TITLE PLACEHOLDER",
			content: "Tagahawak ng kontent wala pakibaliwala",
			destination: "/",
			label: "label"
		}

	return (
			<>
				<Banner error={data}/>
			</>
		)
}