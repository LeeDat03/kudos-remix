import { Profile } from "@prisma/client";

interface props {
	profile: Profile;
	className?: string;
	// onClick?: (...args: any) => any;
	onClick?: () => void;
}

export function UserCircle({ profile, onClick, className }: props) {
	const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (event.key === "Enter" || event.key === " ") {
			onClick?.();
		}
	};

	return (
		<div
			className={`${className} cursor-pointer bg-gray-400 rounded-full flex justify-center items-center`}
			onClick={onClick}
			onKeyPress={handleKeyPress}
			role="button"
			tabIndex={0}
			style={{
				backgroundSize: "cover",
				...(profile.profilePicture
					? { backgroundImage: `url(${profile.profilePicture})` }
					: {}),
			}}
		>
			{!profile.profilePicture && (
				<h2>
					{profile.firstName.charAt(0).toUpperCase()}
					{profile.lastName.charAt(0).toUpperCase()}
				</h2>
			)}
		</div>
	);
}
