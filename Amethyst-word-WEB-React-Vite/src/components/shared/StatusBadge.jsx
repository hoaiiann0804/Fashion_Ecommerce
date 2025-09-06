
export default function StatusBadge({ status, colorClass }) {
    return (
      <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${colorClass}`}>
        {status}
      </span>
    );
  }