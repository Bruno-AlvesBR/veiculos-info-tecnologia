import { MatPaginatorIntl } from '@angular/material/paginator';

export function createPaginatorIntlPortugueseBrazil(): MatPaginatorIntl {
  const paginatorInternationalization = new MatPaginatorIntl();

  paginatorInternationalization.itemsPerPageLabel = 'Itens por página:';
  paginatorInternationalization.nextPageLabel = 'Próxima página';
  paginatorInternationalization.previousPageLabel = 'Página anterior';
  paginatorInternationalization.firstPageLabel = 'Primeira página';
  paginatorInternationalization.lastPageLabel = 'Última página';

  paginatorInternationalization.getRangeLabel = (
    page: number,
    pageSize: number,
    length: number
  ): string => {
    if (length === 0 || pageSize === 0) {
      return `0 de ${length}`;
    }

    const startIndex = page * pageSize;
    const endIndex =
      startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;

    return `${startIndex + 1} - ${endIndex} de ${length}`;
  };

  return paginatorInternationalization;
}
