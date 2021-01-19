import clear from 'clear';
import * as cliProgress from 'cli-progress';
import * as Command from 'commander';

import { Events, Book } from '../shared/rayuela/importers/books';

const multibar = new cliProgress.MultiBar(
  {
    clearOnComplete: false,
    hideCursor: true,
    format:
      'progress [{bar}] {percentage}% | ETA: {eta}s | {value}/{total} | Entity: {description}',
    emptyOnZero: true,
  },
  cliProgress.Presets.shades_grey,
);

let barBooks: cliProgress.SingleBar;

function onStartBooks(totalBooks) {
  barBooks = multibar.create(totalBooks, 0, { description: 'Books' });
}
function onStopBooks() {
  barBooks.stop();
}
function onProcessedBook() {
  barBooks.increment();
}

async function run() {
  const program = new Command.Command();
  program.version('0.0.1');
  program.requiredOption(
    '-b, --books-data-csv-file <booksDataCsvFile>',
    'path to book csv file exported from gesties database',
  );

  program.parse(process.argv);
  const book = new Book(program.opts());
  clear();
  console.info('Processing data files...');
  book.on(Events.BOOKS_STARTED, onStartBooks);
  book.on(Events.BOOKS_FINISHED, onStopBooks);
  book.on(Events.BOOK_PROCESSED, onProcessedBook);

  await book.process();
}

run()
  .then(() => {
    multibar.stop();
    process.exit(0);
  })
  .catch((err) => {
    multibar.stop();
    console.info(err);
    process.exit(1);
  });
