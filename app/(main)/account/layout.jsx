import AccountSidebar from "./component/account-sidebar";

function Layout({ tabs }) {
    return (
        <section className="relative pb-16 md:w-[48rem] lg:w-[64rem] mx-auto">
            {/* <div className="container relative mt-10">
                <div className="lg:flex">
                    <div className="lg:w-1/3">
                        <div className="relative">
                            <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900">
                                <div className="profile-pic text-center mb-5">
                                    <input
                                        id="pro-img"
                                        name="profile-image"
                                        type="file"
                                        className="hidden"
                                        onchange="loadFile(event)"
                                    />
                                    <div>
                                        <div className="relative size-28 mx-auto">
                                            <Image
                                                src="/assets/images/profile.jpg"
                                                className="rounded-full shadow dark:shadow-gray-800 ring-4 ring-slate-50 dark:ring-slate-800"
                                                id="profile-banner"
                                                alt="profile-image"
                                                width={112}
                                                height={112}
                                            />
                                            <label
                                                className="absolute inset-0 cursor-pointer"
                                                htmlFor="pro-img"
                                            />
                                        </div>
                                        <div className="mt-4">
                                            <h5 className="text-lg font-semibold">
                                                Jenny Jimenez
                                            </h5>
                                            <p className="text-slate-400">
                                                jennyhot@hotmail.com
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-t border-gray-100 dark:border-gray-700">
                                    <Menu />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-11/12 md:px-3 mt-[30px] lg:mt-0">
                        {tabs}
                    </div>
                </div>
            </div> */}

            <div className="container relative mt-10">
                <div className="grid grid-cols-12 gap-2 lg:gap-4">
                    <AccountSidebar />
                    <div className="col-span-12 md:col-span-9 md:px-3 mt-[30px] lg:mt-0">
                        {tabs}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Layout;
