declare interface HeaderBoxProps {
    type?: "title" | "greeting";
    title: string;
    subtext: string;
    user?: string;
  }

  declare interface FooterProps {
    user: User;
    type?: 'mobile' | 'desktop'
  }