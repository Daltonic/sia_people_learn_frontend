import React from "react";

interface DiscoveryIconProps {
  fill?: string;
  stroke?: string;
  className?: string;
}

const DiscoveryIcon: React.FC<DiscoveryIconProps> = ({
  fill = "#000",
  stroke = "none",
  className,
}) => (
  <svg fill={fill} stroke={stroke} className={className}>
    <path
      d="M10.0002 18.8889C8.2421 18.8889 6.52353 18.3675 5.06176 17.3908C3.59999 16.4141 2.46068 15.0258 1.7879 13.4016C1.11512 11.7774 0.939089 9.99012 1.28207 8.26584C1.62505 6.54157 2.47163 4.95772 3.71477 3.71458C4.9579 2.47145 6.54175 1.62487 8.26602 1.28189C9.9903 0.938906 11.7776 1.11494 13.4018 1.78771C15.026 2.46049 16.4143 3.5998 17.391 5.06157C18.3677 6.52334 18.889 8.24192 18.889 9.99998C18.889 12.3575 17.9525 14.6184 16.2856 16.2854C14.6186 17.9524 12.3576 18.8889 10.0002 18.8889ZM10.0002 2.29442C8.47615 2.29442 6.98636 2.74634 5.71918 3.59304C4.45201 4.43974 3.46437 5.64318 2.88116 7.05119C2.29794 8.4592 2.14534 10.0085 2.44266 11.5033C2.73999 12.998 3.47387 14.371 4.55151 15.4486C5.62915 16.5263 7.00215 17.2602 8.49688 17.5575C9.99161 17.8548 11.5409 17.7022 12.9489 17.119C14.357 16.5358 15.5604 15.5481 16.4071 14.281C17.2538 13.0138 17.7057 11.524 17.7057 9.99998C17.7042 7.95679 16.8919 5.9977 15.4472 4.55295C14.0024 3.1082 12.0433 2.29589 10.0002 2.29442Z"
      fill="#FEFBF4"
    />
    <path
      d="M7.68382 13.5056C7.49085 13.5069 7.30049 13.461 7.12934 13.3718C6.95819 13.2827 6.81144 13.153 6.70187 12.9941C6.59231 12.8353 6.52327 12.652 6.50076 12.4604C6.47824 12.2687 6.50295 12.0745 6.57271 11.8945L7.77827 8.78897C7.86792 8.55979 8.00403 8.35165 8.17805 8.17764C8.35206 8.00363 8.5602 7.86751 8.78938 7.77786L11.8949 6.58342C12.1092 6.49951 12.3433 6.4799 12.5685 6.52699C12.7938 6.57408 13.0004 6.68583 13.1631 6.84854C13.3259 7.01126 13.4376 7.21789 13.4847 7.44314C13.5318 7.66839 13.5122 7.90248 13.4283 8.11675L12.2227 11.2112C12.1331 11.4404 11.9969 11.6485 11.8229 11.8225C11.6489 11.9965 11.4408 12.1327 11.2116 12.2223L8.10605 13.4168C7.97198 13.4721 7.82884 13.5023 7.68382 13.5056ZM12.3227 7.67786L9.21716 8.88897C9.14007 8.91855 9.07006 8.964 9.01168 9.02238C8.9533 9.08077 8.90784 9.15077 8.87827 9.22786L7.68382 12.3334L10.7838 11.1112C10.8609 11.0816 10.9309 11.0362 10.9893 10.9778C11.0477 10.9194 11.0931 10.8494 11.1227 10.7723L12.3227 7.67786Z"
      fill="#FEFBF4"
    />
  </svg>
);

export default DiscoveryIcon;