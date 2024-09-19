import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";

export interface SideBarItemProps {
  icon: StaticImport;
  iconActive: StaticImport;
  title: string;
  sidebarOpenStatus?: boolean;
  route: string;
  pathname: string;
}

const SideBarItem = (props: SideBarItemProps) => {
  const isSelect = useMemo(() => {
    return props.pathname == props.route;
  }, [props.route, props.pathname]);

  return (
    <li className="py-1 ">
      <Link
        href={props.route}
        className="flex items-center hover:bg-sidebar-hover rounded-r-xl h-12 w-full justify-center"
        style={{
          borderTopRightRadius: props.sidebarOpenStatus ? 16 : 4,
          borderBottomRightRadius: props.sidebarOpenStatus ? 16 : 4,
          borderTopLeftRadius: props.sidebarOpenStatus ? 0 : 4,
          borderBottomLeftRadius: props.sidebarOpenStatus ? 0 : 4,
          justifyContent: props.sidebarOpenStatus ? "flex-start" : "center",
        }}
      >
        <div
          className={"bg-primary w-1 h-12 rounded-sm"}
          style={{
            backgroundColor: isSelect ? "var(--primary)" : "transparent",
          }}
        />
        {isSelect ? (
          <Image src={props.iconActive} alt="" className="h-6 w-6 mr-2 ml-2" />
        ) : (
          <Image src={props.icon} alt="" className="h-6 w-6 mr-2 ml-2" />
        )}

        {props.sidebarOpenStatus && (
          <p
            style={{
              color: isSelect ? "var(--primary)" : "black",
            }}
            className={"text-[16px] "}
          >
            {props.title}
          </p>
        )}
      </Link>
    </li>
  );
};

const isEqual = (preProps: SideBarItemProps, nextProps: SideBarItemProps) => {
  return (
    preProps.route === nextProps.route &&
    preProps.icon === nextProps.icon &&
    preProps.iconActive === nextProps.iconActive &&
    preProps.title === nextProps.title &&
    preProps.sidebarOpenStatus === nextProps.sidebarOpenStatus &&
    preProps.pathname === nextProps.pathname
  );
};

export default React.memo(SideBarItem, isEqual);
