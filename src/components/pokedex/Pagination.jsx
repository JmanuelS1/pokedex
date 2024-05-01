
import React from 'react';
import './styles/Pagination.css';

const Pagination = ({ cardsPerPage, totalCards, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalCards / cardsPerPage);
    const pageRange = 5;

    let startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
    let endPage = Math.min(totalPages, startPage + pageRange - 1);

    if (endPage - startPage + 1 < pageRange) {
        startPage = Math.max(1, endPage - pageRange + 1);
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
            <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                <button onClick={() => onPageChange(i)} className={`page-link ${currentPage === i ? 'active-button' : ''}`}>{i}</button>
            </li>
        );
    }

    const firstPageButton = currentPage > 1 && (
        <li className="page-item">
            <button onClick={() => onPageChange(1)} className="page-link">First</button>
        </li>
    );

    const lastPageButton = currentPage < totalPages && (
        <li className="page-item">
            <button onClick={() => onPageChange(totalPages)} className="page-link">Last</button>
        </li>
    );

    const prevIndicator = startPage > 1 && (
        <li className="page-item disabled">
            <span className="page-link">...</span>
        </li>
    );

    const nextIndicator = endPage < totalPages && (
        <li className="page-item disabled">
            <span className="page-link">...</span>
        </li>
    );

    return (
        <ul className="pagination">
            {firstPageButton}
            {prevIndicator}
            {pageNumbers}
            {nextIndicator}
            {lastPageButton}
        </ul>
    );
};

export default Pagination;
