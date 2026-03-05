import classNames from 'classnames';
import { Person } from '../types';
import { NavLink } from 'react-router-dom';

type Props = {
  people: Person[];
  person: Person;
  isSelected: boolean;
  onSelect: (name: string) => void;
};

type ParentLinkProps = {
  parentName: string | null;
  slug: string;
  onSelect: (name: string) => void;
  isFemale?: boolean;
};

const ParentLink = ({
  parentName,
  slug,
  onSelect,
  isFemale,
}: ParentLinkProps) => {
  if (!parentName) {
    return <>-</>;
  }

  if (!slug) {
    return <>{parentName}</>;
  }

  return (
    <NavLink
      to={`../${slug}`}
      onClick={() => onSelect(parentName)}
      className={isFemale ? 'has-text-danger' : ''}
    >
      {parentName}
    </NavLink>
  );
};

const getSlugByName = (name: string, people: Person[]): string => {
  return people.find(person => person.name === name)?.slug ?? '';
};

export default function PersonLink({
  people,
  person,
  isSelected,
  onSelect,
}: Props) {
  const motherSlug = person.motherName
    ? getSlugByName(person.motherName, people)
    : '';
  const fatherSlug = person.fatherName
    ? getSlugByName(person.fatherName, people)
    : '';

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': isSelected })}
    >
      <td>
        <NavLink
          to={`../${person.slug}`}
          onClick={() => onSelect(person.name)}
          className={classNames({ 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </NavLink>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        <ParentLink
          parentName={person.motherName}
          slug={motherSlug}
          onSelect={onSelect}
          isFemale
        />
      </td>
      <td>
        <ParentLink
          parentName={person.fatherName}
          slug={fatherSlug}
          onSelect={onSelect}
        />
      </td>
    </tr>
  );
}
