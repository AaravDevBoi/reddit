import Image from "next/image";
import React from "react";
import {
	BellIcon,
	ChatIcon,
	GlobeIcon,
	PlusIcon,
	SparklesIcon,
	SpeakerphoneIcon,
	VideoCameraIcon,
} from "@heroicons/react/outline";
import {
	ChevronDownIcon,
	HomeIcon,
	SearchIcon,
	MenuIcon,
} from "@heroicons/react/solid";


function Header() {
	return (
		<div className="sticky top-0 z-50 flex px-4 py-2 bg-white shadow-md">
			<div className="relative flex-shrink-0 w-20 h-10 cursor-pointer">
				<Image
					src="https://links.papareact.com/fqy"
					layout="fill"
					objectFit="contain"
				/>
			</div>

			<div className="flex items-center mx-7 xl:min-w-[300px]">
				<HomeIcon className="w-5 h-5" />
				<p className="flex-1 ml-2 lg:inline">Home</p>
				<ChevronDownIcon className="w-5 h-5" />
			</div>

			<form className="flex items-center flex-1 px-3 py-1 space-x-2 bg-gray-100 border border-gray-200 rounded-sm ">
				<SearchIcon className="w-6 h-6 text-gray-400" />
				<input
					type="text"
					placeholder="Search Reddit"
					className="flex-1 bg-transparent outline-none"
				/>
				<button hidden type="submit" />
			</form>

			<div className="items-center hidden mx-5 space-x-2 text-gray-500 lg:inline-flex">
				<SparklesIcon className="icon" />
				<GlobeIcon className="icon" />
				<VideoCameraIcon className="icon" />
				<hr className="h-10 border border-gray-200"/>
				<ChatIcon className="icon" />
				<BellIcon className="icon" />
				<PlusIcon className="icon" />
				<SpeakerphoneIcon className="icon" />
			</div>

			<div className="flex items-center ml-5 lg:hidden">
				<MenuIcon className="icon" />
			</div>

			<div className="flex items-center p-2 mx-2 space-x-2 border border-gray-100">
				<div className="relative flex-shrink-0 w-5 h-5">
					<Image src="https://links.papareact.com/23l" layout="fill" alt="" objectFit="contain" />
				</div>

				<p className="hidden lg:inline-flex">Sign In</p>
			</div>
			
		</div>
	);
}

export default Header;
