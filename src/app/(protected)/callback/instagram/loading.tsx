import Loader from "@/components/global/loader";

const Loading = () => {
    return (
        <div className="h-screen flex justify-center items-center">
            <Loader state>
                ...Loading
            </Loader>
        </div>
    );
};

export default Loading;
