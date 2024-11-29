import React from "react";

interface InfoCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, description }) => {
    return (
        <div className="flex flex-col items-center text-center">
            <div className="text-blue-500 text-3xl mb-2">{icon}</div>
            <h3 className="font-bold text-lg text-gray-700 mb-1">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
};

const InfoCards: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 mt-[60px] mb-[55px]">
            <InfoCard
                icon={<i className="fas fa-car" />}
                title="Your pick of rides at low prices"
                description="No matter where you're going, by bus or carpool, find the perfect ride from our wide range of destinations."
            />
            <InfoCard
                icon={<i className="fas fa-id-card" />}
                title="Trust who you travel with"
                description="We take the time to get to know each of our members and bus partners for a secure experience."
            />
            <InfoCard
                icon={<i className="fas fa-bolt" />}
                title="Scroll, click, tap and go!"
                description="Booking a ride has never been easier! Use our app to find a ride in minutes."
            />
        </div>
    );
};

export default InfoCards;
