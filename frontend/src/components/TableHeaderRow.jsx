
/**
 * Sticky table header row
*/
function TableHeaderRow({children}) {
    return (
    <tr className="
    font-serif text-md
    sticky top-0 z-[1] 
    bg-secondary-200
    [&>*:first-child]:rounded-l-[6px]
    [&>*:last-child]:rounded-r-[6px]
    ">
        {children}
    </tr>);
}

export default TableHeaderRow;