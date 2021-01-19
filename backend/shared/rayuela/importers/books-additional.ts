import csvtojson from 'csvtojson';

import { Connection } from 'typeorm';
import { Author } from '../../../modules/books/entities/author.entity';
import { Book } from '../../../modules/books/entities/book.entity';
import { Copy } from '../../../modules/books/entities/copy.entity';
import { Publisher } from '../../../modules/books/entities/publisher.entity';

import { BookDTO } from '../dto';
import { CopyStatus } from '../../../enums/copy-status.enum';

export class ImportBooks {
  private booksDTO: BookDTO[] = [];

  constructor(
    private readonly booksDataCsvFile: string,
    private readonly connection: Connection,
  ) {}

  async processBooks(): Promise<void> {
    this.booksDTO = await csvtojson().fromFile(this.booksDataCsvFile);
  }

  async processBook(bookDTO: BookDTO): Promise<any> {
    const bookRepo = this.connection.getRepository(Book);
    const copyRepo = this.connection.getRepository(Copy);
    const authorRepo = this.connection.getRepository(Author);
    const publisherRepo = this.connection.getRepository(Publisher);
    const bookDB = await bookRepo.findOne(
      {
        barcode: bookDTO['codigo_barras_libro'],
      },
      { relations: ['copies'] },
    );
    const book = new Book();
    book.title = bookDTO.libros;
    book.isbn = bookDTO.isbn;
    book.barcode = bookDTO.codigo_barras_libro;
    book.year = +bookDTO.anio_edicion || 0;
    book.startDate = new Date(bookDTO.fecha_inicio);
    book.endDate = new Date(bookDTO.fecha_fin);
    book.stock = +bookDTO.numero_ejemplares || 0;
    book.price = +bookDTO.precio || 0;
    if (!bookDB) {
      await bookRepo.save(bookRepo.create(book));
    } else {
      await bookRepo.update(bookDB.id, { ...book });
    }
    const copyDB = await copyRepo.findOne({
      barcode: bookDTO.codigo_barras_ejemplar,
    });
    const copy = new Copy();
    copy.barcode = bookDTO.codigo_barras_ejemplar;
    copy.status = CopyStatus.AVAILABLE;
    copy.book = bookDB;
    if (!copyDB) {
      await copyRepo.save(copyRepo.create(copy));
    } else {
      await copyRepo.update(copyDB.id, { ...copy });
    }
    // console.info(JSON.stringify(bookDB, null, 4));
    // const parent1 = new Parent();
    // const parent2 = new Parent();
    // parent1.middleName = studentDTO['Primer apellido Primer tutor'];
    // parent1.lastName = studentDTO['Segundo apellido Primer tutor'];
    // parent1.firstName = studentDTO['Nombre Primer tutor'];
    // if (studentDTO['DNI/Pasaporte Primer tutor']) {
    //   parent1.idNumber = studentDTO['DNI/Pasaporte Primer tutor'];
    // }
    // parent1.phone =
    //   studentDTO['Teléfono Primer tutor'] +
    //   (studentDTO['Tlfno. urgencias Primer tutor']
    //     ? '/' + studentDTO['Tlfno. urgencias Primer tutor']
    //     : '');
    // parent1.email = studentDTO['Correo electrónico Primer tutor'] || '';
    // parent2.middleName = studentDTO['Primer apellido Segundo tutor'];
    // parent2.lastName = studentDTO['Segundo apellido Segundo tutor'];
    // parent2.firstName = studentDTO['Nombre Segundo tutor'];
    // if (studentDTO['DNI/Pasaporte Segundo tutor']) {
    //   parent2.idNumber = studentDTO['DNI/Pasaporte Segundo tutor'];
    // }
    // parent2.phone =
    //   studentDTO['Teléfono Segundo tutor'] +
    //   (studentDTO['Tlfno. urgencias Segundo tutor']
    //     ? '/' + studentDTO['Tlfno. urgencias Segundo tutor']
    //     : '');
    // parent2.email = studentDTO['Correo electrónico Segundo tutor'] || '';
    // let par1: Parent = null;
    // let par2: Parent = null;
    // if (parent1.idNumber) {
    //   par1 = await parentRepo.findOne({ idNumber: parent1.idNumber });
    //   if (par1) {
    //     await parentRepo.update({ idNumber: par1.idNumber }, { ...parent1 });
    //   } else {
    //     par1 = await parentRepo.save(parent1);
    //   }
    // }
    // if (parent2.idNumber) {
    //   par2 = await parentRepo.findOne({ idNumber: parent2.idNumber });
    //   if (par2) {
    //     await parentRepo.update({ idNumber: par2.idNumber }, { ...parent2 });
    //   } else {
    //     par2 = await parentRepo.save(parent2);
    //   }
    // }
    // if (student) {
    //   student.parents = [];
    //   if (par1) {
    //     student.parents.push(par1);
    //   }
    //   if (par2) {
    //     student.parents.push(par2);
    //   }
    //   await studentRepo.save(student);
    //   const stud = new Student();
    //   if (studentDTO['DNI/Pasaporte']) {
    //     stud.idNumber = studentDTO['DNI/Pasaporte'];
    //   }
    //   stud.fileId = studentDTO['Nº Expte en el centro'];
    //   stud.phone =
    //     studentDTO.Teléfono +
    //     (studentDTO['Teléfono de urgencia']
    //       ? '/' + studentDTO['Teléfono de urgencia']
    //       : '');
    //   stud.address = studentDTO.Dirección;
    //   stud.city = studentDTO['Localidad de residencia'];
    //   stud.state = studentDTO['Provincia de residencia'];
    //   stud.zipCode = studentDTO['Código postal'].toString();
    //   stud.birthDate = moment(
    //     studentDTO['Fecha de nacimiento'],
    //     'DD/MM/YYYY',
    //   ).toDate();
    //   stud.email = studentDTO['Correo electrónico'];
    //   if (this.geo && stud && stud.address && stud.city) {
    //     const coordinates: Coordinate[] = await this.geocoder.geocode(
    //       `${stud.address} ${stud.city}`,
    //     );
    //     if (
    //       coordinates &&
    //       coordinates[0] &&
    //       coordinates[0].latitude &&
    //       coordinates[0].longitude
    //     ) {
    //       stud.latitude = coordinates[0].latitude;
    //       stud.longitude = coordinates[0].longitude;
    //     }
    //   }
    //   await studentRepo.update({ nie: student.nie }, { ...stud });
    // }
  }

  getBooksDTO(): BookDTO[] {
    return this.booksDTO;
  }
}
