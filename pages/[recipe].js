import { useRouter } from "next/router";
import Header from "../components/header";

export default function Recipe() {
    const router = useRouter();
    const recipe = router.query;

    return (
        <div>
            <Header/>
            <h2>
                The Recipe: {recipe.recipe} is made by Unknown
            </h2>
        </div>
    )
}